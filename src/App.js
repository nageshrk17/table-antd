import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Checkbox, Button } from 'antd';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

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


const filterByColumn = [{
  id: 1,
  label: 'Name',
  name: 'name',
  checked: true,
 },
 {
  id: 2,
  label: 'Age',
  name: 'age',
  checked: true,
 },{
  id: 3,
  label: 'Address',
  name: 'address',
  checked: true,
 }];


function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

let columns; 
let arr = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: null,
      filteredColumns: [],
      items: [{
        id: 1,
        label: 'Name',
        name: 'name',
        checked: true,
       },
       {
        id: 2,
        label: 'Age',
        name: 'age',
        checked: true,
       },
       {
        id: 3,
        label: 'Address',
        name: 'address',
        checked: true,
       }],
       columns: [
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
          
          onFilterDropdownVisibleChange: (visible) => {
            console.log('wefewf');
            
            console.log('wefewf', this.state);
          },
        }
       ],
    };
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);

   
  }

  showButton(rowIndex) {
    this.setState({ selected: rowIndex });
  }

  hideButton() {
    this.setState({ selected: null });
  }

  onCheckBoxChange(e) {
    const { items } = this.state;
    const sample = items && items.map((item) => {
       if (item.name === e.target.name) {
         item.checked = e.target.checked;
      }
    });
    this.setState(this.state)
    return items;
  }

  onClickSubmit() {
    const { items, columns } = this.state;
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
    this.setState(this.state)
    return columns;
   }
   
  onSortEnd(index) {
      const {items, columns} = this.state;
      this.setState({items: arrayMove(items, index.oldIndex, index.newIndex)});
      this.setState({columns: arrayMove(columns, index.oldIndex, index.newIndex)})

  }

  render() {
    const {items, columns} = this.state;
    console.log({columns});
    console.log({items});

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
        <SortableContainer onSortEnd={this.onSortEnd}>
          { items && items.map((status, index) => (
             <SortableItem key={status.id} index={index} value={ <Checkbox key={status.id} checked={status.checked} onChange={this.onCheckBoxChange} name={status.name}>{status.label}</Checkbox>} />
          ))}
        </SortableContainer>
        <div>
          <Button type="primary" onClick={this.onClickSubmit}>Done</Button>
        </div>
      </div>
    );
  }
}

export default App;

