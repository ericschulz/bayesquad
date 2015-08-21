rm(list=ls())
packages <- c('plyr', 'ggplot2', 'jsonlite', 'MASS', 'MCMCpack', 'plyr', 'rjags', 'fields', 'kernlab', 'nnet')
lapply(packages, require, character.only = TRUE)
myjson<-fromJSON("https://myexample.firebaseio.com/.json")


track1<-track2<-track3<-track4<-numeric()
for (i in 1:length(myjson)){
dat<-myjson[[i]]
track1<-c(track1,which(dat$chosen==1))
track2<-c(track2,which(dat$chosen2==1))
track3<-c(track3,which(dat$chosen3==1))
track4<-c(track4,which(dat$chosen4==1))
}

pdf("rawsample.pdf")
par(oma=c(0,0,2,0))
par(mfrow=c(2,2))
hist(track1, main="Height", xlab="Chosen Input", col="grey")
hist(track2, main="Email", xlab="Chosen Input", col="grey")
hist(track3, main="Dice", xlab="Chosen Input", col="grey")
hist(track4, main="Game", xlab="Chosen Input", col="grey")
title("Sampled Input Spaces", outer=TRUE, cex=5)
dev.off()


