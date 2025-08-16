#include <iostream>
#include <string>
using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string input;
    cin >> input;

    int arr[26]={};

    for(int i=0;i<input.length();i++){
        int idx=int(input[i]);
        arr[idx-97]++;
    }
    
    for(int i=0;i<26;i++){
        cout << arr[i] << " ";
    }
    return 0;
}