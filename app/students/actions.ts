"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function readForm(formData: FormData) {
  return {
    studentCode: String(formData.get("studentCode") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    major: String(formData.get("major") ?? "").trim(),
    year: Number(formData.get("year")),
  };
}

function isUniqueError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

// CREATE
export async function createStudent(formData: FormData) {
  const { studentCode, name, email, major, year } = readForm(formData);

  try {
    await prisma.student.create({
      data: { studentCode, name, email: email || null, major, year },
    });
  } catch (error) {
    if (isUniqueError(error)) {
      redirect("/students/create?error=duplicate");
    }
    throw error;
  }

  revalidatePath("/students");
  redirect("/students");
}

// UPDATE
export async function updateStudent(studentId: number, formData: FormData) {
  const { studentCode, name, email, major, year } = readForm(formData);

  try {
    await prisma.student.update({
      where: { id: studentId },
      data: { studentCode, name, email: email || null, major, year },
    });
  } catch (error) {
    if (isUniqueError(error)) {
      redirect(`/students/${studentId}/edit?error=duplicate`);
    }
    throw error;
  }

  revalidatePath("/students");
  redirect("/students");
}

// DELETE
export async function deleteStudent(id: number) {
  await prisma.student.delete({
    where: { id },
  });

  revalidatePath("/students");
}
