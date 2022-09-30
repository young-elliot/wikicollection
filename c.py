import pyautogui
import time

x=185
y=185
y_=900
time.sleep(3)
for i in range(30):
    pyautogui.moveTo(x,y)
    y+=20
    pyautogui.click()
    time.sleep(0.5)
    # click response
    pyautogui.moveTo(120,820)
    pyautogui.click()
    time.sleep(0.5)
    pyautogui.moveTo(x,y_)
    pyautogui.click()
    time.sleep(0.5)
    pyautogui.hotkey('ctrl','a')
    time.sleep(0.5)
    pyautogui.hotkey('ctrl','c')
    time.sleep(0.5)
    pyautogui.hotkey("alt","tab")
    time.sleep(0.5)
    pyautogui.hotkey('ctrl',"v")
    pyautogui.press("enter")
    # break