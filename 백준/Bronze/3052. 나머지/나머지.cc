#include <iostream>

using namespace std;

int main()
{
   int arr[42]={};
   for(int i=0;i<10;i++){
    int a;
    cin >> a;
    int remain=a%42;
    arr[remain]++;
   } 

   int cnt=0;
   for(int i=0;i<42;i++){
    if(arr[i]>0) cnt++;
   }
   cout << cnt << endl;
   return 0;
}