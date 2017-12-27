import React          from 'react';
import ReactDOM       from 'react-dom';
import App            from '../App';
import {MemoryRouter} from 'react-router-dom';
import {Provider}     from 'react-redux';
import store          from '../store';
import Page           from './support/page';
import {user}         from '../store';

const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));

it('sets user if present in localstorage', async () => {
  localStorage.setItem('user', 'test@test.com');
  const page = new Page({store});

  await asyncFlush();

  expect(page.text).toContain('Log Out test@test.com');
});
