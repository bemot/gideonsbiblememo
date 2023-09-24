import React, { Component } from "react";
import kj from "../BIBLES/KingJames.json";
import og from "../BIBLES/UkrainianOgienko.json";
import rs from "../BIBLES/RussianSynodal.json";
import jsonData from "../ChatGPT/calendar.json";
import { DropdownList } from "react-widgets";
import "react-widgets/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatToTwoDigits(value) {
  return value.padStart(2, "0");
}

function formatDateToSearch(monthDay) {
  console.log("before formating", monthDay);
  const parts = monthDay.split("/");
  const month = formatToTwoDigits(parts[0]);
  const day = formatToTwoDigits(parts[1]);
  return month + day;
}

function parseVerse(verse) {
  console.log("parseVerse ", verse);
  // Split by space to separate the book name and chapter-verse numbers
  const regex = /([a-zA-Z\s]+)(\d+.*)/;
  const match = verse.match(regex);
  if (match) {
    return {
      book: match[1].trim(),
      chapterVerse: match[2].trim(),
    };
  }
  return null;
}

function extractVerses(entry) {
  const summary = entry.SUMMARY;
  const parts = summary.split("\\;");
  if (parts.length !== 2) {
    return null; // Format not as expected
  }

  const oldTestament = parts[0]
    .replace("Read Bible: ", "")
    .split(";")
    .map(parseVerse);

  const newTestament = parts[1].split(";").map(parseVerse);
  return {
    oldTestament,
    newTestament,
  };
}

function findVersesByDate(jsonData, targetMonthDay) {
  //console.log(jsonData);
  const entries = jsonData.GIDEONSCALENDAR;
  for (let entry of entries) {
    const monthDayPart = entry.DTSTART.substring(4, 8);
    if (monthDayPart === targetMonthDay) {
      return extractVerses(entry);
    }
  }
  return null;
}

function ActivateBible(props) {
  //console.log("props ", props);
  const bibles = [
    { name: "Ukrainian Ogienko Bible" },
    { name: "King James Bible" },
    { name: "Russian Synodal Bible" },
  ];
  //let alertWhenChanged = () => console.log('from activeBible');
  return (
    <div>
      <DropdownList
        data={bibles}
        valueField="name"
        textField="name"
        defaultValue={bibles[0].name}
        onChange={props.onChange}
      />
    </div>
  );
}

function ShowCurentBible(props) {
  //console.log("in show current bible", og);
  if (props.biblename === "Ukrainian Ogienko Bible")
    return (
      <div>
        Current bible: {props.biblename}
        <br />
        {og.books[0].chapters[0].verses[0].text}
      </div>
    );
  if (props.biblename === "King James Bible")
    return (
      <div>
        Current bible: {props.biblename}
        <br />
        {kj.books[0].chapters[0].verses[0].text}
      </div>
    );

  if (props.biblename === "Russian Synodal Bible")
    return (
      <div>
        Current bible: {props.biblename}
        <br />
        {rs.books[0].chapters[0].verses[1].text}
      </div>
    );
}

function ShowDayMonth(props) {
  //console.log("in showdaymonth", props);
  let day = props.date.getDate();
  let month = props.date.getMonth() + 1;
  //console.log("before formating ", "month ", month, "day", day);
  let searchString = formatDateToSearch(month + "/" + day);
  //console.log("searchString = ", searchString);
  let verses = findVersesByDate(jsonData, searchString);
  let NTtext =
    verses.newTestament[0].book + " " + verses.newTestament[0].chapterVerse;
  let OTtext =
    verses.oldTestament[0].book + " " + verses.oldTestament[0].chapterVerse;

  return (
    <div>
      day: {day} month: {month}
      <div>{NTtext}</div>
      <div>{OTtext}</div>
    </div>
  );
}

class Bible extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      biblename: "Ukrainian Ogienko Bible",
      date: new Date(),
    };
    //this.handleWhatBible = this.handleWhatBible.bind(this);
  } ///end constructor

  // Define an effect when the component mounts
  componentDidMount() {
    document.title = `Bible: ${this.state.bible}`;
  }

  // Define an effect when the 'count' state updates
  componentDidUpdate() {
    document.title = `Bible: ${this.state.bible}`;
  }

  async handleWhatBible(value) {
    // console.log("we are heer!!! ");
    // console.log("value=", value);
    this.setState(() => {
      return {
        biblename: value,
      };
    });
  }

  async handleDateChange(value) {
    console.log("Current TIME=", value);
    this.setState(() => {
      return {
        date: value,
      };
    });
  }

  render() {
    return (
      <div>
        <div>
          <DatePicker
            selected={this.state.date}
            showIcon
            closeOnScroll={true}
            onChange={(value) => {
              this.handleDateChange(value);
            }}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div>
          <ShowDayMonth date={this.state.date} />
        </div>
        <ActivateBible
          onChange={(value) => {
            this.handleWhatBible(value.name);
          }}
        />
        <ShowCurentBible biblename={this.state.biblename} />
      </div>
    );
  }
}

export default Bible;
