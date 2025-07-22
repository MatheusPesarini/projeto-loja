"use client";

import RegisterForm from "@/components/forms/RegisterForm";

export default function Page() {
  return (
    <div className="flex w-full justify-center p-6 md:p-28">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
