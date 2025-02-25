"use client";

import RecipeCard from "@/components/RecipeCard";
import { checkAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("comensal");

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = checkAuth((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const mockRecipes = [
    {
      id: 1,
      name: "Tarta de Manzana",
      description: "Una deliciosa tarta con manzanas caramelizadas.",
      category: "Postre",
      image: "/images/tarta.jpeg",
    },
    {
      id: 2,
      name: "Ensalada César",
      description: "Lechuga fresca con aderezo césar y crutones.",
      category: "Almuerzo",
      image: "/images/ensaladaC.jpeg",
    },
    {
      id: 3,
      name: "Pasta Carbonara",
      description: "Pasta cremosa con tocineta y queso parmesano.",
      category: "Cena",
      image: "/images/carbonara.jpeg",
    },
    {
      id: 4,
      name: "Smoothie de Fresas",
      description: "Refrescante batido de fresas con yogur.",
      category: "Bebidas",
      image: "/images/batidoF.jpeg",
    },
    {
      id: 5,
      name: "Brownie",
      description: "Un brownie es un bizcocho denso de chocolate, suave por dentro y crujiente por fuera.",
      category: "postre",
      image: "/images/brownie.jpeg",
    },
    {
      id: 6,
      name: "Lasaña de carne",
      description: "La lasaña de carne es pasta en capas con salsa, carne y queso gratinado.",
      category: "almuerzo",
      image: "/images/lasaña.jpeg",
    },
    {
      id: 7,
      name: "Pasta alfredo",
      description: "La pasta Alfredo es pasta con salsa cremosa de mantequilla y queso.",
      category: "almuerzo",
      image: "/images/pasta.jpeg",
    },
    {
      id: 8,
      name: "Ceviche de pescado",
      description: "El ceviche de pescado es pescado marinado en limón con cebolla y cilantro.",
      category: "Almuerzo",
      image: "/images/ceviche.jpeg",
    },
    {
      id: 9,
      name: "Coctel brisa tropical",
      description: "El cóctel Brisa Tropical es una mezcla refrescante de ron, jugos tropicales y hielo.",
      category: "Bebidas",
      image: "/images/coctel.jpeg",
    },
    {
      id: 10,
      name: "Hamburguesa",
      description: "La hamburguesa es un sándwich de carne a la parrilla con pan, queso y vegetales.",
      category: "Cena",
      image: "/images/hamburguesa.jpeg",
    },
  ];
  return (
    <div className="flex h-screen">
      {role === "chef" ? (
        <div className="w-full flex">

          {/* Sección izquierda: Formulario */}
          <div className="w-1/2 bg-[#E5ADA8] p-6 rounded-xl shadow-lg flex items-center justify-center">
            <div className="w-full max-w-[90%]">
              <h2 className="text-2xl font-bold text-[#745437] shadow-2xl shadow-[#b97a76]/50 font-cursive text-center mb-6">
                Agregar Receta 🍽️
              </h2>
              <form className="space-y-4">
                {/* Nombre de la receta */}
                <div>
                  <label className="block font-bold text-[#745437]">Nombre de la receta</label>
                  <input
                    type="text"
                    className="w-full p-2 border-2 border-[#dd8e80] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8e80]"
                    placeholder="Ej. Tarta de Manzana"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block font-bold text-[#745437]">Descripción</label>
                  <input
                    type="text"
                    className="w-full p-2 border-2 border-[#dd8e80] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8e80]"
                    placeholder="Breve descripción de la receta"
                  />
                </div>

                {/* Ingredientes */}
                <div>
                  <label className="block font-bold text-[#745437]">Ingredientes</label>
                  <input
                    type="text"
                    className="w-full p-2 border-2 border-[#dd8e80] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8e80]"
                    placeholder="Lista de ingredientes separados por comas"
                  />
                </div>

                {/* Pasos */}
                <div>
                  <label className="block font-bold text-[#745437]">Pasos</label>
                  <input
                    type="text"
                    className="w-full p-2 border-2 border-[#dd8e80] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8e80]"
                    placeholder="Describe los pasos para preparar la receta"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="block font-bold text-[#745437]">Categoría</label>
                  <select
                    className="w-full p-2 border-2 border-[#dd8e80] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd8e80]"
                  >
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option value="Desayuno">Desayuno</option>
                    <option value="Almuerzo">Almuerzo</option>
                    <option value="Cena">Cena</option>
                    <option value="Postre">Postre</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>

                {/* Área de arrastrar imagen */}
                <div
                  className="w-full p-10 border-2 border-dashed border-white rounded-lg text-center text-white cursor-pointer hover:bg-[#dd8e80]/30 transition-all duration-300"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {image ? (
                    <img src={image} alt="Imagen seleccionada" className="w-full h-40 object-cover rounded-lg" />
                  ) : (
                    <p className="font-bold">📷 Arrastra si quieres agregar imagen</p>
                  )}
                </div>

                {/* Botón de Guardar */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full max-w-[200px] bg-[#ffffff] text-[#dd8e80] font-bold py-2 px-4 rounded-lg border-2 border-[#dd8e80] 
                   hover:bg-[#dd8e80] hover:text-white hover:border-[#dd8e80] transition-all duration-300"
                  >
                    Guardar Receta
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="w-1/2 bg-[#fff3f1] flex items-center justify-center">
            <p className="text-[#dd8e80] font-bold text-xl">📖 Aquí se mostrará el contenido</p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-[#fff3f1] flex flex-wrap gap-4 items-start h-full p-6 mb-5">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>

      )}


    </div>
  );
};

export default Dashboard;
