import { imageUrl } from "@/app/lib/imageUrl";
import { getTechStack } from "@/sanity/lib/getTechStack";
import Image from "next/image";
import { TechStack } from "../../sanity.types";

const Stack = async () => {
  const techStack: TechStack[] = await getTechStack();
  return (
    <section id="stack" className="py-16 glass">
      <div className="max-w-[1200px] mx-auto px-4 text-center">
        <h2 className="text-5xl text-gray-200 font-bold mb-6 sm:mb-4">My Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2 ">
          {techStack.map((stack) => (
            <div
              key={stack._id}
              className="flex items-center justify-center flex-col rounded-xl p-2 sm:p-4"
            >
              <div className="mb-4 bg-white/10 rounded-xl p-4">
                {stack.techLogo && (
                  <Image
                    src={imageUrl(stack.techLogo).url()}
                    alt={stack.techName ? `${stack.techName} icon` : "Technology icon"}
                    width={100}
                    height={100}
                    className="sm:w-32 sm:h-32 w-25 h-25 hover:scale-105 transition-transform duration-200 ease-in-out"
                  />
                )}
              </div>

              <p className="text-gray-400 font-semibold text-center">
                {stack.techName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
