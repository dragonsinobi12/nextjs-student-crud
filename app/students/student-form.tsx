import Link from "next/link";

type StudentFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  error?: string;
  defaultValues?: {
    studentCode: string;
    name: string;
    email: string | null;
    major: string;
    year: number;
  };
};

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function StudentForm({
  action,
  submitLabel,
  error,
  defaultValues,
}: StudentFormProps) {
  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      {error === "duplicate" && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาใช้รหัสอื่น
        </p>
      )}

      <div>
        <label htmlFor="studentCode" className={labelClass}>
          รหัสนักศึกษา
        </label>
        <input
          id="studentCode"
          type="text"
          name="studentCode"
          defaultValue={defaultValues?.studentCode}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          ชื่อ-นามสกุล
        </label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={defaultValues?.name}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={defaultValues?.email ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="major" className={labelClass}>
          สาขา
        </label>
        <input
          id="major"
          type="text"
          name="major"
          defaultValue={defaultValues?.major}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="year" className={labelClass}>
          ชั้นปี
        </label>
        <input
          id="year"
          type="number"
          name="year"
          min="1"
          max="8"
          defaultValue={defaultValues?.year}
          required
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>

        <Link
          href="/students"
          className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}
