import "./sec_Page.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Sec_page = (props) => {
  let [data, setData] = useState([]);

  useEffect(() => {
    get();
    console.log(data);
  }, []);

  async function get() {
    try {
      const { data: posts } = await axios.get(
        "https://api.tvmaze.com/search/shows?q=all"
      );
      const post = posts.filter((items) => {
        return props.gets == items.show.id;
      });
      console.log(post);
      setData(post);
    } catch (err) {
      console.log(err.message);
    }
  }

  let [Show, setShow] = useState(false);
  const booking = () => {
    setShow(true);
  };

  let [name, setname] = useState("");
  let [phone, setphone] = useState("");

  const onChangeStart = (e) => {
    if (e.target.id == "name") {
      setname(e.target.value);
    }
    if (e.target.id == "phone") {
      setphone(e.target.value);
    }
    console.log(name);
  };
  let [formValue, SetformValue] = useState({});

  const Submit = (e) => {
    e.preventDefault();
    SetformValue({
      name: name,
      phone: phone,
    });
  };

  useEffect(() => {
    localStorage.setItem("formValue", JSON.stringify(formValue));
  }, [formValue]);

  return (
    <>
      {data.map((item, index) => {
        return (
          <div className="full-box" key={index}>
            {Show ? (
              <div className="oops">
                <form onSubmit={Submit}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={onChangeStart} />
                  <br />
                  <label htmlFor="phone">Phone</label>
                  <input type="text" id="phone" onChange={onChangeStart} />
                  <br />
                  <label htmlFor="movie">Movie</label>
                  <input
                    type="text"
                    id="movie"
                    value={item.show.name}
                    disabled
                    onChange={onChangeStart}
                  />
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            ) : (
              <div className="oops">
                <div>
                  {" "}
                  <img src={item.show.image.medium} />
                </div>
                <div>
                  <h1>
                    {item.show.name}{" "}
                    <span>{item.show.premiered.slice(0, 4)}</span>-
                    <span>
                      {item.show.ended == null
                        ? "Now"
                        : item.show.ended.slice(0, 4)}
                    </span>
                  </h1>
                  <h3>
                    Language:<span>{item.show.language}</span>
                  </h3>
                  <h3>
                    Rating: <span>{item.show.rating.average}/10</span>
                  </h3>
                  <p>{item.show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                </div>
                <div>
                  <button onClick={booking}>BOOKING MOVIE</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Sec_page;
