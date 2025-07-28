import React from 'react'

function Cards() {
  const cardData = [
    {img:'exercise', keyword: 'Body Tracking', description: 'Track your body movements and postures during workouts.' },
    {img:'fitness', keyword: 'Calories Count', description: 'Keep a count of your daily calorie intake and burn.' },
    {img:'yoga', keyword: 'Fitness Record', description: 'Maintain a record of your fitness progress and achievements.' },
  ];

  return (
    <div className='bg-gray-950 mb-20 flex justify-center items-center'>
      <div className='grid grid-cols-3 max-w-4xl' style={{gap:'10%'}}>
        {cardData.map((card, index) => (
          <div key={index} className='card bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:-translate-y-5'>
            <img className='w-full h-56 object-cover' style={{ height: '200px', width: '300px', objectFit: 'cover' }} src={`https://source.unsplash.com/featured/?${card.img}`} alt={card.keyword}/>
            <div className='p-4'>
              <h2 className='text-xl font-bold text-gray-300'>{card.keyword}</h2>
              <p className='mt-2 text-gray-400' style={{ whiteSpace: 'pre-line' }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards