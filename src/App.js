import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Checkbox, Button, Input } from 'antd';


const dataSource = [{
  key: 0,
  name: 'Mike',
  age: 32,
  address: '10 Downing Street'
}, {
  key: 1,
  name: 'John',
  age: 42,
  address: '10 Downing Street'
}];

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
      filteredColumns: [],
      oldIndex: null,
      newIndex: null,
      items: [{
        id: 1,
        name: 'Tanoj',
        checked: true,
       },
       {
        id: 2,
        name: 'Prateek',
        checked: true,
       },
       {
        id: 3,
        name: 'Milerva',
        checked: true,
       }],
      
    };
    this.onClickSort = this.onClickSort.bind(this);
    this.filterList = this.filterList.bind(this);
    this.sortLaunchesAscending = this.sortLaunchesAscending.bind(this);
    this.sortLaunchesDescending = this.sortLaunchesDescending.bind(this);
  }

  componentWillMount() {
    this.setState({filterItems: this.state.items})
  }

  showButton(rowIndex) {
    this.setState({ selected: rowIndex });
  }

  hideButton() {
    this.setState({ selected: null });
  }

  onClickSort() {
    const { items, columns, oldIndex, newIndex } = this.state;
    const col = columns && columns.map((item) => {
      item.className = 'show';
      items.map((item1) => {
        if (item.dataIndex === item1.name) {
          if(!item1.checked) {
            item.className = 'hide';
          }
        }
      });
    });
    this.setState({columns: arrayMove(columns, oldIndex, newIndex)})
    return columns;
   }

  sortLaunchesAscending() {
    const { items } = this.state;
    const sortedList = items.slice(0).sort((r1, r2) => {
      if (r1.name < r2.name) { 
          return -1;
      }
      if (r1.name > r2.name) {
          return 1;
      }
      return 0;
    });
    this.setState({items: sortedList});
  }

  sortLaunchesDescending() {
    const {items} = this.state;
    const sortedList = items.slice(0).sort((r1, r2) => {
      if (r1.name < r2.name) { 
          return 1;
      }
      if (r1.name > r2.name) {
          return -1;
      }
        return 0;
    });
    this.setState({items: sortedList});
  }

  filterList(e) {
    console.log('value', e.target.value);
    var updatedList = this.state.items;
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({filterItems: updatedList});

    console.log('filterList', this.state.items);
  }

   
  render() {
    const {filterItems} = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'show',
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        className: 'show',
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        className: 'show',
        render: (text, record, index) => (
          <span>
          { this.state.selected === index ? <span>Button</span> : '' } 
          </span>
        ),
        filterDropdown: (
          <div>
            <div>
              <div>
                <Button type="primary" onClick={this.sortLaunchesAscending}>A-Z</Button>
              </div>
              <div>
                <Button type="primary" onClick={this.sortLaunchesDescending}>Z-A</Button> 
              </div>
              <div>
                <Input type="text" placeholder="Basic usage" onChange={this.filterList} />
              </div>

              { filterItems && filterItems.map((item) => (
                <div>
                  <Checkbox key={item.id} checked={item.checked} onChange={this.onCheckBoxChange} name={item.name}>{item.name}</Checkbox>
                </div>
              ))}
            </div>
          </div>
        ),
      }
     ];
    return (
      <div className="App">
        <Table 
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }} 
          onRow={(record, rowIndex) => {
            return {
              onMouseEnter: (event) => {this.showButton(rowIndex)},
              onMouseLeave: (event) => {this.hideButton()},
            };
          }}
        />
      </div>
    );
  }
}

export default App;

