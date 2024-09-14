import React from "react";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({
  src,
  alt = "",
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <User
            className="text-gray-400"
            size={size === "sm" ? 16 : size === "md" ? 24 : 32}
          />
        </div>
      )}
    </div>
  );
}
