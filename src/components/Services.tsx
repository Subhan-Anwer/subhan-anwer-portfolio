import { getServices } from "@/sanity/lib/getServices"


const Services = async () => {
    const services = await getServices();

    return (
      <section
        id="services"
        className="text-white px-6 md:px-12 py-16 md:py-20"
      >
        <div className="container mx-auto flex flex-col lg:flex-row ">
          <div className="lg:w-1/4 md:w-2/4 pr-8 mb-12 lg:mb-0">
            <h2 className="text-5xl text-purple-300 font-extrabold sticky top-20">
              SERVICES
            </h2>
          </div>

          <div className="lg:w-3/4 md:w-2/4 mt-1">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="mb-16 flex flex-col sm:flex-row items-start"
              >
                <div className="text-purple-300 font-bold text-5xl">
                  {(index + 1) < 10 ? `0${index + 1}` : index + 1}
                </div>

                <div className="ml-0 sm:ml-6 mt-4 sm:mt-0">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}

export default Services
