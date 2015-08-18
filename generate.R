library(MASS)
y<-rnorm(1000, 169, 10)


b<-seq(min(y),max(y),l=12)
round(b)
h<-hist(y, xlab="", ylab="", breaks=b, main="")
hp<-h

getwd()
setwd('/home/hanshalbe/Desktop/BayesQuad')
dir.create("example")
setwd("example")

(190-130)/11


for (j in 1:5){

  combs<-combn(1:11,j)

  for (i in 1:ncol(combs)){
    hp$counts<-rep(0,11)
    hp$counts[combs[,i]]<-h$counts[combs[,i]]
    pname<-rep(0,11)
    pname[combs[,i]]<-1
    name<-paste0("h", paste0(pname, collapse = ""), ".png")
    png(name)
    plot(hp, ylab="", xlab="Height in cm", main="Frequency Plot", ylim=c(0,max(h$counts)), col="tomato")
    dev.off()
  }
}

hp$counts<-rep(0,11)
png("h00000000000.png")
plot(hp, ylab="", xlab="Height in cm", main="Frequency Plot", ylim=c(0,max(h$counts)), col="tomato")
dev.off()
