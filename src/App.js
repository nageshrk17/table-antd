import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Checkbox, Button } from 'antd';


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


let columns; 
let arr = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
      filteredColumns: [],
    };
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);

    columns = [
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
            <div className="custom-filter-dropdown">
              <Checkbox onChange={this.onCheckBoxChange} name='name'>Name</Checkbox>
              <Checkbox onChange={this.onCheckBoxChange} name='age'>Age</Checkbox>
            </div>
            <div>
              <Button type="primary" onClick={this.onClickSubmit}>Done</Button>
            </div>
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => {
          console.log('wefewf');
          
          console.log('wefewf', this.state);
        },
      }
     ];
  }

  showButton(rowIndex) {
    this.setState({ selected: rowIndex });
  }

  hideButton() {
    this.setState({ selected: null });
  }

   onCheckBoxChange(e) {
    if(e.target.checked) {
      arr.push(e.target.name);
      this.setState({ filteredColumns: arr });
    } else {
      arr.pop(e.target.name);
      this.setState({ filteredColumns: arr });
    }
  }

  onClickSubmit() {
    const { filteredColumns } = this.state;
    const col = columns && columns.map((item) => {
      item.className = 'show';
      filteredColumns.map((item1) => {
        if (item.dataIndex === item1) {
          item.className = 'hide';
        }
      });
    });
    this.setState(this.state)
    return columns;
   }

  render() {
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
