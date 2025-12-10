import api from "../api/api";


export const getProducts = async () => {
  const res = await api.get("/products");  
  return res.data;                        
};


export const getSingleProduct = async (id: number) => {
  const res = await api.get(`/products/${id}`); 
  return res.data;                              
};
