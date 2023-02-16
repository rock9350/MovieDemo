import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./first_page.css";

class Part_1 extends Component {
  state = {
    getData: [],
  };

  componentDidMount = async () => {
    try {
      const { data: post } = await axios.get(
        "https://api.tvmaze.com/search/shows?q=all"
      );
      this.setState({ getData: post });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    let get = this.state.getData;
    get
      .filter((items, index) => {
        return items.show.image != null;
      })
      .map((item, index) => {
        if (item.show.ended == null) {
          console.log(item.show.rating.average);
        }
      });

    return (
      <>
        {get
          .filter((items, index) => {
            return items.show.image != null;
          })
          .map((item, index) => {
            return (
              <div className="box" key={index}>
                <div>
                  {" "}
                  <img className="movie-img" src={item.show.image.medium} />
                </div>
                <div className="box-details">
                  <h1 className="movie-name">
                    {item.show.name}{" "}
                    <span className="rel-date">
                      ({item.show.premiered.slice(0, 4)} -
                    </span>
                    <span className="end-date">
                      {item.show.ended == null
                        ? "Now"
                        : item.show.ended.slice(0, 4)}
                      )
                    </span>
                  </h1>
                  <h3 className="lang">
                    Language:<span>{item.show.language}</span>
                  </h3>
                  <h3 className="rate">
                    Rating:{" "}
                    <span>
                      {item.show.rating.average
                        ? item.show.rating.average
                        : "0"}
                      /10
                    </span>
                  </h3>
                  <NavLink
                    className="img"
                    to="/movie"
                    onClick={() => {
                      this.props.setgets(item.show.id);
                    }}
                  >
                    Watch Now
                  </NavLink>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

export default Part_1;
