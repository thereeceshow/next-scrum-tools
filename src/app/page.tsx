"use client";
import React, { useEffect, useState, useRef } from "react";
import TaskList from "./components/TaskList";
import { TasksProvider, useCategories } from "./context/TasksContext";
import { CatagoriesProvider } from "./context/CatagoriesContext";
// import { Card, Container, Stack, Row, Col, ListGroup, CloseButton, Form, Button, Badge } from 'react-bootstrap';
// import ListGroupItem from 'react-bootstrap';
// import { Draggable } from 'react-draggable';

const ScrumBoard = () => {
  const catagories = useCategories();
  console.log(catagories);
  return (
    <TasksProvider>
      <div className="overflow-scroll">
        <div
          className={`flex flex-row flex-nowrap mt-8 overflow-x-scroll items-start gap-3 mx-10`}
          // className='grid grid-cols-1 md:grid-cols mt-8 overflow-x-scroll w-full items-start gap-3 flex flex-row'
        >
          {catagories.map((cat, index) => {
            return <TaskList category={cat} key={index} />;
          })}
        </div>
      </div>
    </TasksProvider>
  );
};

export default ScrumBoard;
