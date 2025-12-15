
import { defineConfig, devices, expect } from '@playwright/test';


const config=({
  testDir: './tests',
  retries:1,
  timeout:40000,
  expect:{
   timeout:50000,
  },
  reporter:'html',
 projects:[
  {
    name: "safari",
  use: {
    browserName: 'webkit',
    headless: false,
    screenshot: 'on',
    traces: 'retain-on-failure',
    ...devices['iPhone 15 Pro']
  }
},
 {
  name: "chrome",
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    video:'retain-on-failure',
    traces: 'retain-on-failure',
    viewport:{width:500,height:600}
  }
}
 ]
});
module.exports=config

