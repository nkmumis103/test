hello <- function(StoreId = ""){
  if(StoreId == ""){
    stop("您的沒有輸入ID")
  }
  list(
    message = paste("您的ID為", StoreId)
  )
}