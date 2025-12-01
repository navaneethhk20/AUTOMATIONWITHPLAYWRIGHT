
import { defineConfig, devices, expect } from '@playwright/test';


const config=({
  testDir: './tests',
  timeout:40000,
  expect:{
   timeout:50000,
  },
  reporter:'html',
 
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    traces: 'retain-on-failure'
  },

});
module.exports=config

