
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  thumbnail: string;
  modules: Module[];
  students: number;
  status: "published" | "draft";
}
