import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import FormButton from "@/components/forms/FormButton";
import BrandLogo from "@/components/reusables/BrandLogo";

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  onGoogleAuth?: () => void;
  submitButton: {
    text: string;
    loading?: boolean;
    type?: "submit" | "button";
    onClick?: () => void;
  };
  bottomLink: {
    text: string;
    linkText: string;
    href: string;
  };
  showGoogleAuth?: boolean;
  termsText?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  children,
  onGoogleAuth,
  submitButton,
  bottomLink,
  showGoogleAuth = true,
  termsText,
}) => (
  <div className="w-full">
    {/* Header */}
    <div className="mb-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-text-primary">
          {title}
        </h2>
        <BrandLogo width={110} />
      </div>
    </div>

    {/* Form Fields */}
    <div className="space-y-5 mb-6">{children}</div>

    {/* Terms */}
    {termsText && (
      <p className="text-sm text-text-secondary mb-6 leading-relaxed">
        {termsText}{" "}
        <Link
          href="#"
          className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
        >
          Terms and Privacy Policy
        </Link>
        .
      </p>
    )}

    {/* Submit Button */}
    <FormButton
      text={submitButton.text}
      type={submitButton.type || "submit"}
      loading={submitButton.loading}
      handleClick={submitButton.onClick}
      className="w-full h-12 text-base font-medium mb-6"
    />

    {/* Google Auth */}
    {showGoogleAuth && onGoogleAuth && (
      <>
        <div className="flex items-center justify-center mb-6">
          <div className="border-t border-border-light flex-1" />
          <span className="px-4 text-sm text-text-muted">or continue with</span>
          <div className="border-t border-border-light flex-1" />
        </div>

        <FormButton
          variant="outline"
          handleClick={onGoogleAuth}
          className="w-full h-12 border-border-medium text-text-primary hover:bg-background-secondary transition-all mb-6"
        >
          <FcGoogle className="w-5 h-5 mr-3" />
          Continue with Google
        </FormButton>
      </>
    )}

    {/* Bottom Link */}
    <p className="text-center text-base text-text-secondary">
      {bottomLink.text}{" "}
      <Link
        href={bottomLink.href}
        className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
      >
        {bottomLink.linkText}
      </Link>
    </p>
  </div>
);

export default AuthForm;
