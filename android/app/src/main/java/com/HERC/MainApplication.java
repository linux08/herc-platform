package com.HERC;

import android.app.Application;

import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.peel.react.TcpSocketsModule;
import com.swmansion.rnscreens.RNScreensPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.BV.LinearGradient.LinearGradientPackage;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;

import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import co.airbitz.AbcCoreJsUi.AbcCoreJsUiPackage;
import co.airbitz.fastcrypto.RNFastCryptoPackage;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactApplication;
import com.entria.views.RNViewOverflowPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new RNViewShotPackage(),
            new MainReactPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new TcpSocketsModule(),
            new RNScreensPackage(),
            new RandomBytesPackage(),
            new LinearGradientPackage(),
           
            new RNFusedLocationPackage(),
            new RNFastCryptoPackage(),
            new ReactNativeDocumentPicker(),
            new RNDeviceInfo(),
            new RNCameraPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            
            new AbcCoreJsUiPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
