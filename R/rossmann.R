rossmann = function(Store,DayOfWeek,Date,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,
                    CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval){

  input=data.frame(Store,DayOfWeek,Date,Open,Promo,SchoolHoliday,StoreType,Assortment,CompetitionDistance,
                   CompetitionOpenSinceMonth,CompetitionOpenSinceYear,Promo2,Promo2SinceWeek,Promo2SinceYear,PromoInterval)

  input$Date=as.Date(input$Date)
  input$month=as.integer(format(input$Date, "%m"))
  input$year=as.integer(format(input$Date, "%y"))
  input$day=as.integer(format(input$Date, "%d"))
  input=input[,-3]

  int_data=as.character(c("Store","DayOfWeek","Promo","Open","SchoolHoliday","StoreType","Assortment","Promo2","PromoInterval"))
  num_data=as.character(c("CompetitionDistance","CompetitionOpenSinceMonth","CompetitionOpenSinceYear","Promo2SinceWeek","Promo2SinceYear"))

  for(i in int_data)
  {
    input[,i]=as.integer(input[,i])
  }
  for(i in num_data)
  {
    input[,i]=as.numeric(input[,i])
  }

  if(input$Open == 0)
  {
    newdata = 0
  }
  else
  {
    newdata = predict(ross_model, data.matrix(input))
    newdata = exp(newdata)-1
  }


  input_comp = input

  input_comp$Promo = 1
  input_comp$SchoolHoliday = 1
  input_comp$Promo2 = 1

  best_pred = predict(ross_model, data.matrix(input_comp))
  best_pred = exp(best_pred)-1

  input_comp$Promo = 0
  Comp = predict(ross_model, data.matrix(input_comp))
  Comp = exp(Comp)-1

  if(Comp <= best_pred)
  {
    input_comp$Promo = 1
  }

  input_comp$SchoolHoliday = 0
  Comp = predict(ross_model, data.matrix(input_comp))
  Comp = exp(Comp)-1

  if(Comp <= best_pred)
  {
    input_comp$SchoolHoliday = 1
  }

  input_comp$Promo2 = 0
  Comp = predict(ross_model, data.matrix(input_comp))
  Comp = exp(Comp)-1

  if(Comp <= best_pred)
  {
    input_comp$Promo2 = 1
  }

  best_Promo = input_comp$Promo
  best_SchoolHoliday = input_comp$SchoolHoliday
  best_Promo2 = input_comp$Promo2
  best = c(input_comp$Promo,input_comp$SchoolHoliday,input_comp$Promo2)

  best_pred = predict(ross_model, data.matrix(input_comp))
  best_pred = exp(best_pred)-1
  #best_pred

  list(
    message = newdata,
    best_pair_Promo = best_Promo,
    best_pair_SchoolHoliday = best_SchoolHoliday,
    best_pair_Promo2 = best_Promo2,
    best_sales = best_pred)
}



rossmann_fut = function(Store,DayOfWeek,Date,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,
                    CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval){

  input=data.frame(Store,DayOfWeek,Date,Open,Promo,SchoolHoliday,StoreType,Assortment,CompetitionDistance,
                   CompetitionOpenSinceMonth,CompetitionOpenSinceYear,Promo2,Promo2SinceWeek,Promo2SinceYear,PromoInterval)

  getdate=data.frame(Date=input$Date)

  input$Date=as.Date(input$Date)
  getdate$Date=as.Date(getdate$Date)
  input$month=as.integer(format(input$Date, "%m"))
  input$year=as.integer(format(input$Date, "%y"))
  input$day=as.integer(format(input$Date, "%d"))
  input=input[,-3]

  int_data=as.character(c("Store","DayOfWeek","Promo","Open","SchoolHoliday","StoreType","Assortment","Promo2","PromoInterval"))
  num_data=as.character(c("CompetitionDistance","CompetitionOpenSinceMonth","CompetitionOpenSinceYear","Promo2SinceWeek","Promo2SinceYear"))

  for(i in int_data)
  {
    input[,i]=as.integer(input[,i])
  }
  for(i in num_data)
  {
    input[,i]=as.numeric(input[,i])
  }
  pre.week=data.frame(Date=c(1:7),Sale=c(1:7))
  count = 1
  for(j in 1:7){
    if((count == 1) && (input$Open == 0))
    {
      newdata = 0
      count = 0
    }
    else
    {
      input$Open = 1
      newdata = predict(ross_model, data.matrix(input))
      newdata = exp(newdata)-1
    }
    pre.week$Date[j] = as.character(getdate$Date)
    pre.week$Sale[j] = newdata

    getdate$Date=getdate$Date+1
    input$month=as.integer(format(getdate$Date, "%m"))
    input$year=as.integer(format(getdate$Date, "%y"))
    input$day=as.integer(format(getdate$Date, "%d"))
    input$DayOfWeek = (input$DayOfWeek+1)%%7
    if(input$DayOfWeek == 0)
    {
      input$DayOfWeek = 7
    }
  }



  p1 <- ggplot(pre.week,aes(x=Date,y=Sale,label=Sale,group = 1))+
    geom_line()+
    geom_point()+
    geom_text(vjust=-1,size=4)+
    theme_bw()+
    labs(title="Rossmann Future 7 Days Sales Forecast")+
    theme(
      plot.title = element_text(face = "bold",size = 25,hjust = 0.5,vjust=2),
      axis.title=element_text(size = 16),
      axis.title.x=element_text(vjust=2),
      axis.title.y=element_text(vjust=2)
      )

  print(p1)
  #list(
  #day = as.character(pre.week$day),sale = pre.week$sale)

}
