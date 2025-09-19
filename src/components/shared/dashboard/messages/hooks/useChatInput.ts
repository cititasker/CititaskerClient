import { useRef, useEffect, useCallback, useState } from "react";
import { AttachmentOption, FilePreview } from "../types";

interface UseChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: (files?: FilePreview[]) => void;
  onFileSelect?: (
    files: File[],
    type: "image" | "video" | "document" | "contact" | "audio"
  ) => void;
}

export const useChatInput = ({
  value,
  onChange,
  onSend,
  onFileSelect,
}: UseChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [value, adjustTextareaHeight]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Utility functions
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const createFilePreview = useCallback(
    async (
      file: File,
      type: AttachmentOption["type"]
    ): Promise<FilePreview> => {
      const id = Math.random().toString(36).substr(2, 9);
      const preview: FilePreview = {
        id,
        file,
        type:
          type === "image" && file.type.startsWith("video/") ? "video" : type,
        name: file.name,
      };

      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        preview.url = URL.createObjectURL(file);
      }

      return preview;
    },
    []
  );

  // Event handlers
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() || filePreviews.length > 0 || audioUrl) {
          handleSend();
        }
      }
    },
    [value, filePreviews.length, audioUrl]
  );

  const handleFileSelect = useCallback((option: AttachmentOption) => {
    const input = fileInputRefs.current[option.id];
    if (input) {
      input.click();
    }
  }, []);

  const handleFileChange = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      option: AttachmentOption
    ) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        const previews = await Promise.all(
          files.map((file) => createFilePreview(file, option.type))
        );
        setFilePreviews((prev) => [...prev, ...previews]);
        if (onFileSelect) {
          onFileSelect(files, option.type);
        }
      }
      setAttachmentOpen(false);
      e.target.value = "";
    },
    [createFilePreview, onFileSelect]
  );

  const removeFilePreview = useCallback((id: string) => {
    setFilePreviews((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      const toRemove = prev.find((p) => p.id === id);
      if (toRemove?.url) {
        URL.revokeObjectURL(toRemove.url);
      }
      return updated;
    });
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: any) => {
      const newValue = value + emoji.native;
      onChange(newValue);
      inputRef.current?.focus();
    },
    [value, onChange]
  );

  // Voice recording functions
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const cancelRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingTime(0);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    }
  }, [isRecording, audioUrl]);

  const handleSend = useCallback(() => {
    const hasContent = value.trim() || filePreviews.length > 0 || audioUrl;
    if (hasContent) {
      onSend(filePreviews);
      onChange("");
      setFilePreviews([]);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    }
  }, [value, filePreviews, audioUrl, onSend, onChange]);

  const removeAudioPreview = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  }, [audioUrl]);

  // Computed values
  const hasContent =
    value.trim().length > 0 || filePreviews.length > 0 || audioUrl;
  const showSendButton = hasContent || isRecording;

  return {
    // Refs
    inputRef,
    fileInputRefs,

    // State
    isRecording,
    recordingTime,
    attachmentOpen,
    setAttachmentOpen,
    filePreviews,
    audioUrl,

    // Computed
    hasContent,
    showSendButton,

    // Functions
    formatTime,
    handleKeyPress,
    handleFileSelect,
    handleFileChange,
    removeFilePreview,
    handleEmojiSelect,
    startRecording,
    stopRecording,
    cancelRecording,
    handleSend,
    removeAudioPreview,
  };
};
