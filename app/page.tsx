import Navbar from "@/components/Navs/Navbar";
import Image from "next/image";
import Link from "next/link";
import LandingPageBanner from "@/assets/banners/landing_page_banner.jpg"
import Interactive from "@/assets/banners/interactive.jpg"
import Collaborative from "@/assets/banners/collab.jpg"
import Progressive from "@/assets/banners/progress.jpg"
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";



export default function Home() {
  return (



    <div className=" bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-black text-white h-80">
        <div className="absolute inset-0">
          <Image
            src={LandingPageBanner}
            alt="Classroom Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-50"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Classroom Pro</h1>
          <p className="text-lg mb-8">
            The ultimate tool for educators and students to connect, learn, and collaborate seamlessly.
          </p>
          <Link href="/dashboard">
            <p className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition">
              Open Classroom
            </p>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={Interactive}
                alt="Feature 1"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Interactive Lessons</h3>
              <p>
                Create and manage engaging lessons with interactive elements and real-time feedback.
              </p>
            </div>
            {/* Feature Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={Collaborative}
                alt="Feature 2"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Collaborative Tools</h3>
              <p>
                Facilitate group projects and discussions with built-in collaborative tools and resources.
              </p>
            </div>
            {/* Feature Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={Progressive}
                alt="Feature 3"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p>
                Track student progress and performance with detailed analytics and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">

        <div className="mt-16 w-full flex items-center justify-center dark:bg-gray-900">


          <div
            className="relative w-full max-w-2xl my-8 md:my-12 flex flex-col items-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x- px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">

            <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
              Designed and Developed by
            </span>
            <div className="w-full flex flex-col md:flex-row items-start ">

              <div className="w-full md:w-1/5 flex justify-center sm:justify-start sm:w-auto">
                <img className="object-cover w-24 h-24 mt-3 mr-3 rounded-full" src="https://avatars.githubusercontent.com/u/62717967?v=4" />
              </div>

              <div className="w-full md:w-4/5  sm:w-auto flex flex-col items-center sm:items-start justify-center  mt-2">

                <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200" >
                  Swayanshu Panda
                </p>

                <div className="mb-4 md:text-xs text-gray-400 text-justify">
                  <p>A newly skilled full stack developer with extensive experience in React, Next.js, Node.js, databases. Adept at building robust, scalable web applications, leveraging modern frameworks and cloud infrastructure to deliver high-performance solutions. Proficient in both front-end and back-end development, with a strong focus on optimizing user experiences and ensuring seamless integration across platforms.</p>
                </div>

                <div className="flex gap-6 mt-2">

                  <a title="github url" href="https://github.com/swayanshu-2003" target="_blank"
                    rel="noopener noreferrer">

                    <FaGithub className='text-2xl text-white' />

                  </a>

                  <a title="website url" href="https://www.linkedin.com/in/swayanshupanda/" target="_blank" rel="noopener noreferrer">

                    <FaLinkedin className='text-2xl text-white' />

                  </a>
                  <a title="website url" href="https://swayanshu-2003.github.io/portfolio" target="_blank" rel="noopener noreferrer">

                    <IoGlobeOutline className='text-2xl text-white' />

                  </a>
                  <a title="website url" href="https://swayanshu-2003.github.io/portfolio" target="_blank" rel="noopener noreferrer">

                    <MdOutlineAttachEmail className='text-2xl text-white' />

                  </a>

                </div>
              </div>
            </div>

          </div>
        </div>


        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 ClassLink. All rights reserved.</p>
        </div>




      </footer>
    </div>



  );
}
