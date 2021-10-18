
import pyautogui,time

def spam_bot():
	time.sleep(5)

	s="Hey Its me spammy!!"

	for e in range(15):
	    pyautogui.typewrite(s)
	    pyautogui.press("enter")
spam_bot()
