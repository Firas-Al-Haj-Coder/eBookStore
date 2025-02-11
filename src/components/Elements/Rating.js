import React from 'react'

export default function Rating({rating}) {

      // erst valide Rating sicherstellen 
      const validRating = Math.min(Math.max(Number.isFinite(rating) ? rating : 0, 0), 5); // zwischen 0 und 5
      const emptyStars = 5 - validRating; // Differenz vom validRating

  return (
    <>
        {[...Array(validRating)].map((_, i) => ( // rating is defined up, _ ist das aktuelle Element des Arrays (n_rating undefined elementige Array), i ist der index des aktuellen Elements (wird als key verwendet)
            <i key={i} className="text-lg bi bi-star-fill text-yellow-500 mr-1"></i>
        ))}
        {[...Array(emptyStars)].map((_, i) => ( // like 5-rating we get how many should be filled
            <i key={i} className="text-lg bi bi-star text-yellow-500 mr-1"></i>
        ))}
    </>
  )
}
