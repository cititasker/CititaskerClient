interface Reply {
  id: number;
  content: string;
  created_at: string;
  files: any[];
  user_id: number;
  replies?: Reply[];
}

interface ICommenThreadProps {
  id: number;
  content: string;
  created_at: string;
  files: any[];
  user_id: number;
  replies?: Reply[];
}
