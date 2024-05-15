"use client"



import React, { useState, ChangeEvent, useEffect } from 'react';
import './styles.css'; // import styles.css
interface ListItem {
  text: string;
  isChecked: boolean;
}

const LeftAppBar: React.FC = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [checkAll, setCheckAll] = useState<Boolean>(true);
  useEffect(() => {
    // เมื่อ component ถูก mount ให้ดึงข้อมูลจาก API
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => {
        // เมื่อข้อมูลถูกโหลดสำเร็จ ให้ตั้งค่า state
        const l:ListItem[] = [];
        for (let i = 0; i < data.todos.length; i++) {
          l.push({ text: data.todos[i].todo, isChecked: false });
        }
        // data.todo.map((item: any) => {
        //   l.push({ text: item.title, isChecked: false });
        // })
        
        setListItems(l);
      })
      .catch(error => {
        // หากเกิดข้อผิดพลาดในการโหลดข้อมูล
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddToList = () => {
    if (inputValue.trim() !== '') {
      setListItems([...listItems, { text: inputValue, isChecked: false }]);
      setInputValue('');
    }
  };

  const handleCheckboxChange = (index: number) => {
    const newList = [...listItems];
    newList[index].isChecked = !newList[index].isChecked;
    setListItems(newList);
  };

  const handleCheckboxChangeAll = () => {
    const newList = [...listItems];
    for(let i = 0; i < newList.length; i++) {
      if (checkAll)
        newList[i].isChecked = true;
      else
        newList[i].isChecked = false;
    }

    setCheckAll(!checkAll);
    setListItems(newList);
  };

  const handleDeleteItem = (index: number) => {
    const newList = [...listItems];
    newList.splice(index, 1);
    setListItems(newList);
  };

  const countCheckedItems = () => {
    return listItems.filter(item => item.isChecked).length;
  };

  const countAllItems = () => {
    return listItems.length;
  };
  const getPercentage = () => {
    const a = countCheckedItems();
    const b = countAllItems();
    if (a && b) {
    return ((countCheckedItems() / countAllItems()) * 100).toFixed(2) + '%';
    }else {
      return '0%';
    }
  }


  return (
    
    <div className="container">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>

      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          id="fname"
          name="fname"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo..."
        />
        <button className='button1' onClick={handleAddToList}>Add Todo</button>
      </div>
      <div className="card">
        <h2 className='title'>Default Category <button className='button2' onClick={handleCheckboxChangeAll}>select all</button></h2>
        <div className="w3-light-grey">
  <div id="myBar" className="w3-container w3-green w3-center" style={{width: getPercentage(), marginBottom: "20px", borderRadius: "10px"}}>{getPercentage()}</div>
</div>
        <ul>
          
            {listItems.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <p className={item.isChecked ? 'checked' : ''}>{item.text}</p>
                <button type="button" className="deletebtn" onClick={() => handleDeleteItem(index)}>X</button>
              </li>
            ))}
        </ul>
      </div>
      <div className="bar">
        <p>Checked items: {countCheckedItems()} / {countAllItems()}</p>
      </div>

 
    </div>
  );
};

export default LeftAppBar;

