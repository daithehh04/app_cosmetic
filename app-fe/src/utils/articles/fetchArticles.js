import instance from "../../api/api";
const fetchArticles = async (setArticles, setLoading) => {
  try {
    const response = await instance.get(`/articles`);
    setArticles(response.data.data.articles);
  } catch (error) {
    console.log("Erorr fetching fetchArticles :", error.message || error);
  } finally {
    setLoading(false);
  }
};

export default fetchArticles;
