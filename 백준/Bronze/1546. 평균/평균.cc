#include <iostream>

using namespace std;

int main()
{
    int N;
    cin >> N;
    
    double arr[N];
    int max=0;
    for(int i=0;i<N;i++){
        cin >> arr[i];
        if(arr[i]>max) max=arr[i];
    }

    double sum=0;
    for(int i=0;i<N;i++){
        sum+=(arr[i]/max)*100;
    }

    cout << sum/N << endl;

}