import React from "react";
import { Button } from "@/components/ui/button";
import { Send, Pause, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilePreview as FilePreviewType } from "../../../types";
import { useChatInput } from "../../../hooks/useChatInput";
import { FilePreview } from "./FilePreview";
import { RecordingUI } from "./RecordingUI";
import { AttachmentMenu } from "./AttachmentMenu";
import { InputArea } from "./InputArea";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSend: (files?: FilePreviewType[]) => void;
  onFileSelect?: (
    files: File[],
    type: "image" | "video" | "document" | "contact" | "audio"
  ) => void;
}

const ChatInput: React.FC<Props> = ({
  value,
  onChange,
  onSend,
  onFileSelect,
}) => {
  const {
    inputRef,
    fileInputRefs,
    isRecording,
    recordingTime,
    attachmentOpen,
    setAttachmentOpen,
    filePreviews,
    audioUrl,
    showSendButton,
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
  } = useChatInput({ value, onChange, onSend, onFileSelect });

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-border-light">
      {/* File Previews */}
      {(filePreviews.length > 0 || audioUrl) && (
        <div className="border-b border-border-light p-3 bg-neutral-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2 overflow-x-auto py-2">
              {filePreviews.map((preview) => (
                <FilePreview
                  key={preview.id}
                  preview={preview}
                  onRemove={removeFilePreview}
                  recordingTime={recordingTime}
                  formatTime={formatTime}
                />
              ))}
              {audioUrl && (
                <FilePreview
                  preview={{
                    id: "audio",
                    file: new File([], "audio"),
                    type: "audio",
                    name: "Voice Message",
                    url: audioUrl,
                  }}
                  onRemove={removeAudioPreview}
                  recordingTime={recordingTime}
                  formatTime={formatTime}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Input Area */}
      <div className="p-3 sm:p-4">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          {isRecording ? (
            <RecordingUI
              recordingTime={recordingTime}
              formatTime={formatTime}
              onCancel={cancelRecording}
            />
          ) : (
            <>
              <AttachmentMenu
                isOpen={attachmentOpen}
                onOpenChange={setAttachmentOpen}
                onFileSelect={handleFileSelect}
                onFileChange={handleFileChange}
                fileInputRefs={fileInputRefs}
              />
              <InputArea
                inputRef={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyPress}
                onEmojiSelect={handleEmojiSelect}
              />
            </>
          )}

          {/* Send/Voice Button */}
          <div className="flex-shrink-0">
            {showSendButton ? (
              <Button
                onClick={isRecording ? stopRecording : handleSend}
                className={cn(
                  "p-3 h-12 w-12 rounded-full transition-all duration-200",
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-primary hover:bg-primary-600",
                  "text-white shadow-lg hover:scale-105 active:scale-95"
                )}
              >
                {isRecording ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            ) : (
              <Button
                onMouseDown={startRecording}
                onTouchStart={startRecording}
                className={cn(
                  "p-3 h-12 w-12 rounded-full transition-all duration-200",
                  "bg-neutral-200 hover:bg-neutral-300 text-neutral-600",
                  "hover:scale-105 active:scale-95 active:bg-primary active:text-white"
                )}
              >
                <Mic className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-2 text-xs text-neutral-500 text-center">
          <span className="hidden sm:inline">
            Press Enter to send • Shift + Enter for new line
          </span>
          <span className="sm:hidden">Tap to send • Hold mic for voice</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
