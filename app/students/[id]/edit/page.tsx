import prisma from "@/app/lib/prisma";
import { updateStudent } from "../../actions";
import StudentForm from "../../student-form";
import Link from "next/link";

type EditStudentPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditStudentPage({
  params,
  searchParams,
}: EditStudentPageProps) {
  const { id } = await params;
  const { error } = await searchParams;

  const studentId = Number(id);

  const student = Number.isInteger(studentId)
    ? await prisma.student.findUnique({ where: { id: studentId } })
    : null;

  if (!student) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-red-600">ไม่พบข้อมูลนักศึกษา</h1>
        <Link
          href="/students"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          กลับหน้ารายชื่อ
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">แก้ไขนักศึกษา</h1>
        <p className="mt-2 text-gray-600">
          แก้ไขข้อมูลนักศึกษา ID: {student.id}
        </p>
      </div>

      <StudentForm
        action={updateStudent.bind(null, studentId)}
        submitLabel="บันทึกการแก้ไข"
        error={error}
        defaultValues={student}
      />
    </main>
  );
}
