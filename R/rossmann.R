hello = function(StoreId,DayOfWeek,Date,Open,Promo,SchoolHoliday,StoreType,Assortment,CompetitionDistance,
                 CompetitionOpenSinceMonth,CompetitionOpenSinceYear,Promo2,Promo2SinceWeek,Promo2SinceYear,PromoInterval){
  #input=StoreId
  input=data.frame(StoreId,DayOfWeek,Date,Open,Promo,SchoolHoliday,StoreType,Assortment,CompetitionDistance,
                   CompetitionOpenSinceMonth,CompetitionOpenSinceYear,Promo2,Promo2SinceWeek,Promo2SinceYear,PromoInterval)
  input$Date=as.Date(input$Date)
  input$month=as.integer(format(input$Date, "%m"))
  input$year=as.integer(format(input$Date, "%y"))
  input$day=as.integer(format(input$Date, "%d"))
  #input=input[,-3]

  #newdata <- exp(predict.gam(model, data.matrix(input))) -1
  #return(newdata)

  list(
    message = input[1,1])
}
