rm(list=ls())

library(readr)
library(xgboost)

download.file("https://raw.githubusercontent.com/nkmumis103/rossmann/master/inst/ross/train.csv", destfile="train.csv")
#=read_csv("D:/input/test.csv")
#store=read_csv("D:/input/store.csv")

train=merge(train,store)
test=merge(test,store)

train[is.na(train)]   <- 0
test[is.na(test)]   <- 0

test$Date=as.Date(test$Date)
train$Date=as.Date(train$Date)

train=train[ which(train$Open=='1'),]
train=train[ which(train$Sales!='0'),]

train$month=as.integer(format(train$Date, "%m"))
train$year=as.integer(format(train$Date, "%y"))
train$day=as.integer(format(train$Date, "%d"))

test$month=as.integer(format(test$Date, "%m"))
test$year=as.integer(format(test$Date, "%y"))
test$day=as.integer(format(test$Date, "%d"))

train=train[,-c(3,8)]
test=test[,-c(4,7)]

feature.names=names(train)[c(1,2,5:19)]

for (i in feature.names) {
  if (class(train[[i]])=="character") {
    levels=unique(c(train[[i]], test[[i]]))
    train[[i]]=as.integer(factor(train[[i]],levels=levels))
    test[[i]]=as.integer(factor(test[[i]],levels=levels))
  }
}

tr=train[,feature.names]
RMPSE=function(preds, dtrain) {
  labels=getinfo(dtrain, "label")
  elab=exp(as.numeric(labels))-1
  epreds=exp(as.numeric(preds))-1
  err=sqrt(mean((epreds/elab-1)^2))
  return(list(metric = "RMPSE", value = err))
}
set.seed(2100)
nrow(train)
h<-sample(nrow(train),10000)


dval<-xgb.DMatrix(data=data.matrix(tr[h,]),label=log(train$Sales+1)[h])
dtrain<-xgb.DMatrix(data=data.matrix(tr[-h,]),label=log(train$Sales+1)[-h])
watchlist<-list(val=dval,train=dtrain)
param <- list(  objective           = "reg:linear",
                booster = "gbtree",
                eta                 = 0.02, # 0.06, #0.01,#不調高
                max_depth           = 10, #changed from default of 8#不調低
                subsample           = 0.9, # 0.7#不調低
                colsample_bytree    = 0.7 # 0.7#不調低
                #num_parallel_tree   = 2
                # alpha = 0.0001,
                # lambda = 1
)

clf <- xgb.train(   params              = param,
                    data                = dtrain,
                    nrounds             = 3000, #300, #280, #125, #250, # changed from 300
                    verbose             = 1, #0 可以不顯示執行過程
                    early.stop.round    = 100,
                    watchlist           = watchlist,
                    maximize            = FALSE,
                    feval=RMPSE
)
save(clf,"data/model.rda")
