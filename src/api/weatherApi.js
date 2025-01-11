const API_KEY = "4df6985829d0964829e5cc82057af99e";

export const fetchWeather = async (city) => {
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=tr&units=metric`
        );
        if (!response.ok) {
          throw new Error("Şehir Bulunamadı");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Data alınırken hata olustu..", error);
        throw error;
      }
    };