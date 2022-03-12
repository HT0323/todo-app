import React, { useState } from "react";
import "./App.css";
import { CompleteTodos } from "./components/CompleteTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
import { Message } from "./components/Message";

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState(['task1', 'task2']);
  const [completeTodos, setCompleteTodos] = useState(['task3', 'task4']);
  const [message, setMessage] = useState('');

  const onChangeTodoText = (e) => {
    setMessage("");
    setTodoText(e.target.value);
  };

  // タスクの追加機能
  const onClickAdd = () => {
    if (todoText === '') {
      setMessage("文字を入力しないと登録できません");
      return;
    }
    if (incompleteTodos.includes(todoText) || completeTodos.includes(todoText)) {
      setMessage("登録済みのタスクは登録できません");
      return;
    }
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  // タスクの削除機能
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // タスクの完了機能
  const onClickComplete = (index) => {
    // 未完了タスクの更新
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);

    // 完了タスクの更新
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  // タスクを戻す(完了->未完了)機能
  const onClickBack = (index) => {
    // 完了タスクの更新
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);

    // 未完了タスクの更新
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      {message !== "" && <Message message={message} />}
      <InputTodo
        todoText = {todoText}
        onChange = {onChangeTodoText}
        onClick = {onClickAdd}
        disabled = {incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && <p style={{ color: 'red' }}>登録できるtodoは5個まで</p>}
      <IncompleteTodos todos = {incompleteTodos} onClickComplete = {onClickComplete} onClickDelete = {onClickDelete} />
      <CompleteTodos todos = {completeTodos} onClickBack = {onClickBack}/>
    </>
  )
};
