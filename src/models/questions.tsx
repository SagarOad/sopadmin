interface Questions {
  question_name: string;
  exam_slug: string;
  subject_title: string;
  program_name: string;
  grade_name: string;
  exam_name: string;
  question_id: number;
  role_id: string | number | readonly string[] | undefined;
  lms_id: number;
  name: string;
  lms_document: string;
  lms_extension: string;
  created_at: string;
  question_explanation: string;
  exam_id: number;

  slice: any;
  length: any;
  map(arg0: (exam: any, index: number) => JSX.Element): React.ReactNode;
}
