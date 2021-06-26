add([
  text('YOU WIN!'),
  origin('center'),
  scale(0),
  pos(width()/2, height()/2)
])
add([
    text('Hit enter to retry'),
  scale(2),
  pos(0 )  
])
keyPress('enter', () =>  {
    location.reload();
})