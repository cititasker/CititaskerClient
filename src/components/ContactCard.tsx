import Image from "next/image";
import FormButton from "./forms/FormButton";

// User Avatar Stack Component
const UserAvatarStack = ({ count = 5 }: { count?: number }) => (
  <div className="flex items-center justify-center relative h-[50px] w-full mb-8">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="w-12 h-12 rounded-full border-2 border-white shadow-sm absolute bg-neutral-200 overflow-hidden"
        style={{ left: `${32 * index}px`, zIndex: count - index }}
      >
        <Image
          src="/images/user.svg"
          alt={`User ${index + 1}`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);

const ContactCard = ({
  title = "Still have questions?",
  description = "We're here to help! Our support team is ready to provide the information you need and ensure your experience is smooth and hassle-free.",
  buttonText = "Contact Us",
  buttonHref = "#contact",
  showAvatars = true,
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 p-6 lg:p-8 shadow-lg ${className}`}
    >
      {showAvatars && <UserAvatarStack />}

      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-2xl font-bold text-neutral-900 lg:text-3xl">
            {title}
          </h3>
          <p className="text-base leading-relaxed text-neutral-700 lg:text-lg">
            {description}
          </p>
        </div>

        <FormButton
          text={buttonText}
          href={buttonHref}
          className="btn-primary w-full sm:w-auto"
        />
      </div>
    </div>
  );
};

export default ContactCard;
