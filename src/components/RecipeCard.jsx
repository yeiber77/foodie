const RecipeCard = ({ recipe }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 border-2 border-[#dd8e80] 
                      transform transition-transform duration-300 hover:scale-105">
        <img src={recipe.image} alt={recipe.name} className="w-full h-32 object-cover rounded-lg" />
        <h3 className="text-[#745437] font-bold text-lg mt-2">{recipe.name}</h3>
        <p className="text-[#dd8e80] text-sm">{recipe.description}</p>
        <span className="text-sm text-white bg-[#dd8e80] px-2 py-1 rounded-lg inline-block mt-2">
          {recipe.category}
        </span>
      </div>
    );
  };
  
  export default RecipeCard;
  