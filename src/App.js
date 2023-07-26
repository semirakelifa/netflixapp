import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Banner/>
      <Row title="NETFLIX ORIGINAL" fetchurl={requests.fetchNetflixoriginals} 
      isLargeRow
      />
      <Row title="Trending Now" fetchurl={requests.fetchTrending} />
      <Row title="Top Rated" fetchurl={requests.fetchTopRatedMovies} />
      <Row title="Action Movies" fetchurl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchurl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchurl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchurl={requests.fetchRomanceMovies} />
      <Row
        title="Documentaries Movies"
        fetchurl={requests.fetchDocumentaries}
      />
    </div>
  );
}

export default App;
