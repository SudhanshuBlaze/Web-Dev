import time as tm
import datetime
from PIL import Image
import streamlit as st
from streamlit.elements.plotly_chart import _plot_to_url_or_load_cached_url

# Text Title
st.title("Streamlit tutorial")
# Header
st.header("This is a header")
st.subheader("This is a subheader")

# text
st.text("This a Streamlit text")
st.markdown("## This is a Markdown")   # Use '#' symbol to adjust the text size

# If you want to display:

st.success("Successful")
st.info("Info")
st.warning("Zindagi me chalna hai toh achi tarah chal")
st.error("This is an Error danger")
st.exception("NameError('Name three is not defined')")

# Get help info about Python

st.help(list)  # Pass any Python object it will print its Documentation

st.write("Write text")
st.write(range(10))

# Images
# from PIL import Image
img = Image.open("Automate Python.jpg")
st.image(img, width=600, caption="Simple Image")

# Videos
vid_file = open(
    "/Users/sudhanshukumar/Documents/32. React.js/1. What is React.mp4", "rb").read()
st.video(vid_file)

# Audios
# aud_file = open("music.mp3", "rb").read()
# st.audio(aud_file, format="audio/mp3")

if st.checkbox("Show/Hide"):
    st.text("Showing Widget")

# Radio
status = st.radio("What's your status", ("Active", "Inactive", "None"))

# if status == "Active":
#     st.success("You are active")
# else:
#     st.warning("You are Inactive, Activate")
st.success("You are now "+status)

# Select Box
occupation = st.selectbox(
    "Your occupation ", ["Web Dev", "Android Dev", "Data Scientist"])  # can also pass a tuple
# st.text cannot print variables, only text
st.write("You are a " + occupation)

# MultiSelect

location = st.multiselect("What places have you been", [
                          "India", "London", "NYC", "USA", "Malaysia"])
st.write("You selected ", len(location), "loctaions")

# Slider
level = st.slider("What is your level", 1, 50)

if st.button("Click Me!!"):
    st.text("Streamlit is Beautiful!!")

# Text Input
name = st.text_input("Enter your Name", "Type Here")
if st.button("Submit", key=1):
    st.success(name)  # input.title()

message = st.text_area("Enter your Message", "Type Here")
if st.button("Submit", key=2):
    st.success(message)  # input.title()

# Date Input
today = st.date_input("Today is", datetime.datetime.now())
st.write("you selected ", today)

# Time Input
time = st.time_input("Time", datetime.time())

st.text("Displaying JSON")
st.json({"name": "Sudhashu Kumar", "gender": "Male"})

# Display raw Code
st.code("from tensorflow import keras")

# Display Raw Code (shows everything)

with st.echo():
    # This will also show as comment
    import pandas as pd
    df = pd.DataFrame()

with st.spinner("waiting.."):
    tm.sleep(4)
st.success("Finished!!")
st.balloons()

# SideBars
st.sidebar.header("Home")
st.sidebar.text("About")


@st.cache  # Makes the function execution faster
def func():
    return range(100)


st.write(func())

# Plot
# st.pyplot()

# st.dataframe(df)

# st.table(df)

if __name__ == "main":
    st.write(func())
