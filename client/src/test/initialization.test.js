import React          from 'react';
import ReactDOM       from 'react-dom';
import App            from '../App';
import {MemoryRouter} from 'react-router-dom';
import {Provider}     from 'react-redux';
import store          from '../store';
import Page           from './support/page';
import {user}         from '../store';

afterEach(() => {
  store.dispatch({type: 'reset'});
  localStorage.clear();
});

it('sets user if present in localstorage', async () => {
  localStorage.setItem('user', 'test@test.com');
  const page = new Page({store});

  await page.allowRender();

  expect(page.text).toContain('Log Out test@test.com');
});
