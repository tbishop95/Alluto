import React from 'react';
import './SearchBar.css';
import axios from 'axios';

class SearchBar extends React.Component {
  state = {
    where: '',
    what: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
  }

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
    this.setState({ what: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
    this.setState({ where: event.target.value});
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);

    event.preventDefault();

  const item = {
    where: this.state.where,
    what: this.state.what
  }

  axios.post(`http://localhost:8888/AllutoAPI/searchqueries/create.php`, { item })
  .then(res => {
    console.log(res);
    console.log(res.data.items);
  })
  }


  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)}
                  key={sortByOptionValue}
                  onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
             </li>);
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <span className="label">Where</span><input onChange={this.handleLocationChange}/>
          <span className="label">What</span><input onChange={this.handleTermChange} />
        </div>
        <div className="SearchBar-submit">
          <a type="submit" onClick={this.handleSearch}>Find</a>
        </div>
      </div> 
    );
  }
}

export default SearchBar;