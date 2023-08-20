import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
import fontAwesome from "https://cdn.skypack.dev/font-awesome@4.7.0";
import * as bootstrap from "https://cdn.skypack.dev/bootstrap@5.2.3";

const API ='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  state = {
    quotes: [{
      quote: "Life isn’t about getting and having, it’s about giving and being.",
      author: "Kevin Kruse"
    }],
    index: 0
  }
  
  componentDidMount(){
    //call API and update state
    fetch(API).then(res => res.json())
      .then(res => {
        this.setState({
          quotes: res.quotes
        }, this.GetRandomIndex);
    });
  }
  
  getRandomIndex = () => {
    const { quotes, index } = this.state;
    
    if(quotes.length > 0){
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }
  
  render(){
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `http://www.twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;
    
    return (
      <div id="quote-box" className="wrapper d-flex align-items-center justify-content-center vh-100">
        <div className="col-6 box p-3 rounded">
          {
            quote && (
              <div className="mb-4">
                <p  id="text" ><i className="fas fa-quote-left"></i>{quote.quote}</p> 
                <cite  id="author" className="d-block text-end" >- {quote.author}</cite>
              </div>
              )
          }
          <div className="box">
           <div className="d-flex justify-content-between">
             <a id="tweet-quote" href={tweetURL} target="_blank" className="btn btn-primary"><i class="fab fa-twitter"></i>Tweet</a>
            <button id="new-quote" className=" btn btn-primary" onClick={this.getRandomIndex}>Get Quote</button>
          </div>
        </div>
       </div>
      </div>
     
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);