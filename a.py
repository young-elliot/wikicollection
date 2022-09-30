import pyautogui
import time
import pyperclip

# time.sleep(3)


e="""
"""

w=e.split("\n\n\n")
time.sleep(2)
for i in w:
    i=i.replace("&page=1","&page=§1§")
    i+="\n\n"
    pyperclip.copy(i)
    time.sleep(3)
    # pyautogui.hotkey("alt","tab")
    pyautogui.click(600,600)
    pyautogui.hotkey('ctrl','a')
    time.sleep(0.5)
    pyautogui.hotkey('ctrl',"v")
    # pyperclip.paste()
    # pyautogui.write(i)
    time.sleep(0.5)
    pyautogui.click(1860,160)
    time.sleep(90)
    
    x=185
    y=185
    y_=900
    time.sleep(3)
    for j in range(30):
        # click item
        pyautogui.moveTo(x,y)
        y+=20
        pyautogui.click()
        time.sleep(0.5)
        # click response
        pyautogui.moveTo(120,820)
        pyautogui.click()
        time.sleep(0.5)
        # click content
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
    time.sleep(25)