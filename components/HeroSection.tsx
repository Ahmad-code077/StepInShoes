import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='relative py-12'>
      {/* Content Section */}
      <div className='relative z-10 max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-4 lg:gap-12'>
        {/* Text Section */}
        <div className='w-full md:w-1/2'>
          <h1 className='text-3xl sm:text-5xl font-extrabold mb-8'>
            Step Up Your Style with{' '}
            <span className='text-primary'>StepInStyle</span>
          </h1>
          <p className='text-lg sm:text-xl mb-12'>
            Discover the perfect pair for every occasion with our premium
            selection of men’s footwear. From classic formal shoes to stylish
            sneakers, StepInStyle brings you the latest trends and comfort in
            every step.
          </p>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-1/2 max-h-96 '>
          <Image
            src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fcd47476-18fc-488c-8a84-d583a59de563/AIR+MAX+DN+QS.png'
            alt='Shoes'
            width={800}
            height={600}
            className='w-full max-h-96 object-cover object-center rounded-lg shadow-lg'
            unoptimized={true}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
