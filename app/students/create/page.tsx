import { createStudent } from "../actions";
import StudentForm from "../student-form";

type CreateStudentPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function CreateStudentPage({
  searchParams,
}: CreateStudentPageProps) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">เพิ่มนักศึกษา</h1>
        <p className="mt-2 text-gray-600">กรอกข้อมูลนักศึกษา</p>
      </div>

      <StudentForm
        action={createStudent}
        submitLabel="บันทึก"
        error={error}
      />
    </main>
  );
}
